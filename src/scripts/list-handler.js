const lists = []

class List {
  constructor(array, id) {
    this.array = array || [];
    this.id = id || crypto.randomUUID();
    this.ids = generateIds(array.length - 1);
    function generateIds() {
      const result = [];
      array.forEach(() => {
        const uniqueId = crypto.randomUUID();
        result.push(uniqueId);
      })
      return result;
    }
  }
  push(value) {
    const uniqueId = crypto.randomUUID();
    this.array.push(value);
    this.ids.push(uniqueId);
  }
  editValue(index, value) {
    this.array[index] = value;
  }
  delete(id) {
    console.log(id);
    console.log(this);
    const indexToRemove = this.ids.indexOf(id);
    const newArray = this.array.toSpliced(indexToRemove, 1);
    const newIds = this.ids.toSpliced(indexToRemove, 1);
    console.log(newArray);
    this.array = newArray;
    this.ids = newIds;
  }
}

function newList(array) {
  const list = new List(array);
  lists.push(list);
  return list;
}

function getListFromId(targetId) {
  let foundList;
  foundList = lists.find(obj => obj.id === targetId);
  return foundList;
}

function getLists() {
  return lists;
}

const placeholderLists =
  [{
    "array": [
      "123-555-1234",
      "me@email.com",
      "123 Address St. City, State",
      "www.theodinproject.com"
    ],
    "id": "1158d3cf-f0bd-4eb6-9931-4906af93dbd9",
    "ids": [
      "bdc505cc-2909-4213-9b28-eb6f200c941c",
      "e0bc4590-ce77-45cc-a3ae-af0efd683a8a",
      "f00a20f4-8799-43c5-9fa9-ef23c35125a4",
      "b31aae4a-817c-47cd-bca2-912c3238d572"
    ]
  },
  {
    "array": [
      1,
      2,
      3
    ],
    "id": "92eccd36-6647-4426-84dd-643f63e66378",
    "ids": [
      "a52ef35d-5618-400b-8331-6d1a930f228c",
      "bf7aced9-df44-4c78-bead-c3226f59c22c",
      "7e8a119c-10b6-4dec-b9a5-5f11a334a073"
    ]
  }];

placeholderLists.forEach(item => {
  const placeholderObject = new List(item.array, item.id)
  lists.push(placeholderObject);
})

export { newList, getListFromId, getLists };

