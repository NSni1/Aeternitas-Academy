const content = document.getElementById("content");

const contentScroll = (x = 0, y = 0) => {
    content.scroll({top: y, left: x, behavior: "smooth"});
};

const getScrollTop = () => {
    return content.scrollTop;
};
