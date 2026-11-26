function createDeleteBtn() {
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";

  return deleteBtn;
}

function createExpandBtn() {
  const expandBtn = document.createElement("button");
  expandBtn.className = "expand-btn";

  return expandBtn;
}

function createNewObjBtn(btnClass) {
  const newBtn = document.createElement("button");
  newBtn.className = `add-btn new-${btnClass}`;
  newBtn.textContent = "+";

  return newBtn;
}

export { createDeleteBtn, createNewObjBtn, createExpandBtn };
