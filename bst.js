export class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

export class Tree {
  constructor(root = null) {
    this.root = root;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (!node) return;

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }

  includes(value, node = this.root) {
    if (!node) return false;

    if (value === node.value) return true;

    if (value < node.value) {
      return this.includes(value, node.left);
    }

    return this.includes(value, node.right);
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const randomArr = generateRandomArray();

function buildTree(array) {
  const uniqueArray = [...new Set(array)];
  const sortedArray = uniqueArray.toSorted((a, b) => a - b);

  const root = sortedArrayToBSTRecur(sortedArray, 0, sortedArray.length - 1);

  return new Tree(root);
}

function sortedArrayToBSTRecur(array, start, end) {
  if (start > end) return null;

  let mid = start + Math.floor((end - start) / 2);
  let root = new Node(array[mid]);

  root.left = sortedArrayToBSTRecur(array, start, mid - 1);
  root.right = sortedArrayToBSTRecur(array, mid + 1, end);

  return root;
}

function generateRandomArray() {
  const length = Math.floor(Math.random() * (100 - 10 + 1)) + 10;

  const array = [];

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * 10001);
    array.push(randomNumber);
  }

  return array;
}

const tree = buildTree(arr);
console.log(tree.prettyPrint());
console.log(tree.includes(80));
console.log(tree.includes(23));
