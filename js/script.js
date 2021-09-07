// 'use strict';
// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links)
// })

const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
            activeLink.classList.remove('active');
    }
  
    /* add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
  
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href')
    console.log(articleSelector);
  
    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
  
    /* add class 'active' to the correct article */
    
    console.log('targetElement:', targetArticle);
    targetArticle.classList.add('active');


}
  

  

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';
        articles = document.querySelectorAll(optArticleSelector);

    function generateTitleLinks()
    {

        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        function clearMessages()
        {
            titleList.innerHTML = '';
        }

        clearMessages();
        /* for each article */
        
        for(let article of articles)
        {

        /* get the article id */

        const articleId = article.getAttribute('id');
        console.log(articleId);

        /* find the title element */

            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            console.log(articleTitle);

        /* get the title from the title element */

        /* create HTML of the link */
            const linkHTML = '<li><a href="#' + articleId +'"><span>' + articleTitle + '</span></a></li>';
            console.log(linkHTML);
        /* insert link into titleList */
            const insertHTML = document.getElementById('titleList');
            insertHTML.insertAdjacentHTML('afterbegin', linkHTML);
        }

        let links = document.querySelectorAll('.titles a');

        for(let link of links)
        {
            link.addEventListener('click', titleClickHandler);
            
        }
            console.log(links);


    }

    generateTitleLinks();