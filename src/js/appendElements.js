const appendElements = (parentElem, childrenElem) => {
  parentElem.innerHTML = "";
  parentElem.append(...childrenElem);
};

export default appendElements;
