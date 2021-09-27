const templates = {
  articleLink: Handlebars.compile(
    document.querySelector("#template-article-link").innerHTML
  ),
  authorLink: Handlebars.compile(
    document.querySelector("#template-author-link").innerHTML
  ),
  tagLink: Handlebars.compile(
    document.querySelector("#template-tag-link").innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector("#template-tag-cloud-link").innerHTML
  ),
  authorCloudLink: Handlebars.compile(
    document.querySelector("#template-author-cloud-link").innerHTML
  ),
};

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Link was clicked!");

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll(".titles a.active");
  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* add class 'active' to the clicked link */

  console.log("clickedElement:", clickedElement);
  clickedElement.classList.add("active");

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(".posts article.active");
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */

  console.log("targetElement:", targetArticle);
  targetArticle.classList.add("active");
};

function generateTitleLinks(customSelector = "") {
  const optArticleSelector = ".post";
  const optTitleSelector = ".post-title";
  const optTitleListSelector = ".titles";
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log(customSelector);
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  function clearMessages() {
    titleList.innerHTML = "";
  }

  clearMessages();
  /* for each article */

  for (let article of articles) {
    /* get the article id */

    const articleId = article.getAttribute("id");
    console.log(articleId);

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
    /* insert link into titleList */
    const linkList = document.querySelector("#titleList");
    linkList.insertAdjacentHTML("beforeend", linkHTML);
  }

  let links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
  console.log(links);
}

generateTitleLinks();

function removeClassActive() {
  const activeAuthorLinks = document.querySelectorAll(
    'a.active[href^="#author-"]'
  );
  /* START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorLinks) {
    /* remove class active */
    activeAuthorLink.classList.remove("active");
    /* END LOOP: for each active author link */
  }
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {
    /* remove class active */
    activeLink.classList.remove("active");
    /* END LOOP: for each active tag link */
  }
}

const optCloudClassCount = 5;
const optAuthorListSelector = document.querySelector(".authors");

function generateAuthors() {
  let allAuthors = {};
  const optAuthorSelector = ".post-author";
  const optArticleSelector = ".post";
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find authors wrapper */
    const authorWrapper = article.querySelector(optAuthorSelector);
    /* make html variable with empty string */
    let html = "";
    /* get author from data-author attribute */
    const authorName = article.getAttribute("data-author");
    console.log(authorName);
    /* generate HTML of the link */
    const linkHTMLData = { id: authorName, title: authorName };
    console.log("LINK HTML DATA: ", linkHTMLData);
    const linkHTML = templates.authorLink(linkHTMLData);
    console.log("LINK HTML CREATED: ", linkHTML);
    /* insert HTML of all the links into the author wrapper */
    authorWrapper.insertAdjacentHTML("beforeend", linkHTML);
    /* END LOOP: for every article: */
    if (!allAuthors[authorName]) {
      allAuthors[authorName] = 1;
    } else {
      allAuthors[authorName]++;
    }
  }
  const params = calculateElementsParams(allAuthors);
  console.log("authorParams", params);

  const linkHTML = document.querySelector(".authors");
  const authors = [];

  for (let author in allAuthors) {
    authors.push({
      author: author,
      count: allAuthors[author],
      className: calculateElementClass(allAuthors[author], params, "author"),
    });
  }

  const allAuthorsData = { authors: sortByCount(authors) };

  console.log("DATA AUTORS:", allAuthorsData);
  linkHTML.innerHTML = templates.authorCloudLink(allAuthorsData);

  console.log("list of authors: ", allAuthors);
}
generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  console.log("href" + href);
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace("#author-", "");
  console.log("author: " + author);
  /* find all author links with class active */
  removeClassActive();
  /* find all author links with "href" attribute equal to the "href" constant */
  const targetAuthors = document.querySelectorAll(`a[href="${href}"]`);
  /* START LOOP: for each found author link */
  for (let targetAuthor of targetAuthors) {
    /* add class active */
    targetAuthor.classList.add("active");
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-author="${author}"]`);
}
function addClickListenersToAuthors() {
  /* find all links to authors */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {
    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener("click", authorClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
function calculateElementsParams(elements) {
  const params = { max: 0, min: 999999 };
  for (let element in elements) {
    params.max = Math.max(elements[element], params.max);
    params.min = Math.min(elements[element], params.min);
  }
  return params;
}

function calculateElementClass(count, params, elementType) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return `${elementType} size-${classNumber}`;
}

function sortByCount(array, order = "asc") {
  return array.sort((a, b) =>
    order === "asc" ? a.count - b.count : b.count - a.count
  );
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};

  const optArticleTagsSelector = ".post-tags .list";
  const optTagsListSelector = ".tags.list";
  /* find all articles */
  const optArticleSelector = ".post";
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = "";
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    /* split tags into array */
    const tagsArray = articleTags.split(" ");
    /* START LOOP: for each tag */
    for (let tag of tagsArray) {
      /* generate HTML of the link */
      const linkTag = tag;
      /* add generated code to html variable */

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[linkTag]) {
        /* [NEW] add tag to allTags object */
        allTags[linkTag] = 1;
      } else {
        allTags[linkTag]++;
      }

      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.tagLink(linkHTMLData);

      html = html + " " + linkHTML;
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */

    tagsWrapper.insertAdjacentHTML("beforeend", html);

    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  console.log(allTags);
  /* [NEW] create variable for all links HTML code */

  const tagsParam = calculateElementsParams(allTags);
  console.log(tagsParam);

  const tags = [];
  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateElementClass(allTags[tag], tagsParam, "tag"),
    });
  }
  const allTagsData = { tags: sortByCount(tags, "desc") };
  console.log(allTagsData);

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-", "");
  /* find all tag links with class active */
  removeClassActive();
  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetTags = document.querySelectorAll(`a[href="${href}"]`);
  console.log(targetTags);
  /* START LOOP: for each found tag link */
  for (let targetTag of targetTags) {
    /* add class active */
    targetTag.classList.add("active");
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-tags~="${tag}"]`);
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener("click", tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();
