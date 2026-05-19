export class Node {
  constructor(value, leftChild, rightChild) {
    this.value = value;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

export class Tree {
  constructor(root) {
    this.root = root;
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

function buildTree(array) {
  const uniqueArray = [...new Set(array)];
  console.log(uniqueArray);
}

buildTree(arr);
