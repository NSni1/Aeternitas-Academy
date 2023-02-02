const content = document.getElementById("content");

const contentScroll = (x = 0, y = 0) => {
    content.scroll({top: x, left: y, behavior: "smooth"});
};

const getScrollTop = () => {
    return content.scrollTop;
};

export { contentScroll, getScrollTop };
