fetch(`https://www.googleapis.com/blogger/v3/blogs/54481402991158938/posts/<data:blog.postId/>?key=AIzaSyABuyR6o6Ivbncb0Bi2s4eBK1KP4V_Q1_Y`)
    .then(res => {
        if (!res.ok)
            console.log("Error")
        return res.json();
    })
    .then(data => {
        let post = data;
        let [title, content, category, authorName, authorPhoto, datePublished, dateModified, url] = [post.title, post.content, post.labels, post.author.displayName, post.author.image.url, post.published, post.updated, post.url]
        // Schema
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

        const main = document.querySelector(".main");
        main.insertAdjacentHTML('afterbegin', content);

    })
    .catch(err => console.log(err))