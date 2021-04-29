async function post() {
    const postID = document.querySelector('meta[name="postID"]').content;
    let idSplit = postID.match(/.{1,9}/g);
// 3196491273928024314
    const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/54481402991158938/posts/${idSplit[0]}${idSplit[1]}${idSplit[2]}?key=AIzaSyABuyR6o6Ivbncb0Bi2s4eBK1KP4V_Q1_Y`);
    const data = await res.json();
    const content = data.content;
    const main = document.querySelector(".main");
    main.insertAdjacentHTML('afterbegin', content);
    return data;
}
post().then(postContent => {
    let post = postContent;
        let [title, category, authorName, datePublished, dateModified, url] = [post.title, post.labels, post.author.displayName, post.published, post.updated, post.url];
        const schema = `{
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": "${title}",
            "image": "<data:blog.postImageUrl/>",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "${url}"
                },
            "keywords": "${[...category]}",
      "author": {
        "@type": "Person",
        "name": "${authorName}"
      },  
      "publisher": {
        "@type": "Organization",
        "name": "DietSteer",
        "logo": {
          "@type": "ImageObject",
          "url": "https://1.bp.blogspot.com/-WBZG2mB03qw/YHxgxrdNoII/AAAAAAAAAC8/6u1IhCc6XFUr9irvnng8FQjIeNU1vqiXwCLcBGAsYHQ/s0/DietSteer%2BLogo.png"
        }
      },
            "datePublished": "${datePublished}",
            "dateModified": "${dateModified}"
          }`;
          let script = document.createElement("script");
          script.type = "application/ld+json";
          script.innerHTML = schema;
          document.getElementsByTagName('head')[0].appendChild(script);
          const postHead = document.querySelector(".hero-header");
        const breadcrumb = `<div class="breadcrumbs">
        <ol class="breadcrumb-list">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item"><a href="/search/label/${category[0]}">${category[0]}</a></li>
          <li class="breadcrumb-item active">Rapid Weight Loss Techniques: Quick Tips That Can Change An Overweight Person's Life</li>
        </ol>
      </div>`;
      let postDate;
      if (!datePublished == dateModified || datePublished < dateModified) {
          postDate = dateModified;
      } else {
          postDate = datePublished;
      }
      let [month, date, year]  = new Date(postDate).toLocaleDateString("en-US").split("/");
      postHead.insertAdjacentHTML('afterbegin', `${breadcrumb}<h1>${title}</h1>
      <div class="post-info">
              <div class="tags"></div>
              <div class="other-info"><div class="date">Posted on ${date}/${month}/${year}</div>
              <div class="author">Written by <a href="https://www.linkedin.com/in/isanjayjoshy/">${authorName}</a></div></div>
            </div>
      `);
      const tags = category;
      const postINFO = document.querySelector(".tags");
      for (const tag of tags) {
          postINFO.insertAdjacentHTML('afterbegin', `<a href="/search/label/${tag}">${tag}</a>`);
      }
  });
