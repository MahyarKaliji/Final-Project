const keyEvent = (key, action) => {
  function callback(e) {
    if (e.code.toLowerCase() === key.toLowerCase()) action();
  }

  document.addEventListener("keydown", callback);

  document.removeEventListener("keydown", callback);
};

export default keyEvent;
