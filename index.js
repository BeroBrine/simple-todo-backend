const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { stringify } = require('querystring');

const app = express();
const port = 3001;
let id = 0;

app.use(bodyParser.json());

let getIndex = (toDo , fetchId) => {
  for(const i in toDo) {
    if(fetchId === toDo[i].id) return i;
  }
  return -1;
}

let delIndex = (todoarr , fetchId) => {
  const newArr = [];
  for(const i in todoarr) {
    if(todoarr[i].id === fetchId) continue;
    newArr.push(todoarr[i]);
  }
  return newArr;
}

app.get('/todos' , (req ,res) => {
  console.log("get request");
  const data = fs.readFile("todo.json" , "utf-8" , (err , data) => {
    if(err) throw err;
    res.json(JSON.parse(data));
  })
})

app.get('/todos/:id' , (req ,res) => {
  fs.readFile("todo.json" , "utf-8" , (err , data) => {
    if(err) throw err;
    let todo = JSON.parse(data);
    const getindex = getIndex(todo , parseInt(req.params.id));
    res.status(201).send(todo[getindex]);
  })
})

app.post('/todos' , (req , res) => {
  console.log("post req")
  const obj = {
    id: id ,
    title: req.body.title ,
    description: req.body.description ,
  };
  id++;
  fs.readFile("todo.json" , "utf-8" , (err , data) => {
    if(err) throw err;
    const todo = JSON.parse(data);
    todo.push(obj);
    console.log("writing to file ");
    console.log(todo)
    fs.writeFile("todo.json" , JSON.stringify(todo) , (err) => {
      if(err) throw err;
      res.status(201).json(todo);
    });
  });
});

app.put('/todos/:id' , (req , res) => {
  fs.readFile("todo.json" , "utf-8" , (err , data) => {
    if(err) throw err;
    const todo = JSON.parse(data);
    const getIndex = getIndex(todo , parseInt(req.param.id));
    todo[getIndex].title = req.body.title;
    todo[getIndex].description = req.body.description;
    fs.writeFile("todo.json" , JSON.stringify(todo) , (err) => {
      if(err) throw err;
      res.status(201).json(todo);
    });
  });
});

app.delete('/todos/:id' , (req ,res) => {
  fs.readFile("todo.json" , "utf-8" , (err , data) => {
    if(err) throw err;
    let todo = JSON.parse(data);
    todo = delIndex(todo , parseInt(req.params.id));
    fs.writeFile("todo.json" , JSON.stringify(todo) , (err) => {
      if(err) throw err;
      res.status(201).send("done");
    })
  })
})
app.use((req, res , next) => {
  res.status(404).send();
})

app.listen(port , () => {
  console.log(`server started at port number ${port}`)
})
