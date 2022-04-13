import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {

  useEffect(() => {
    axios.get('/api/test')
    .then(res => console.log(res))
    .catch()
  });


  const [mode, setMode] = useState("WELCOME");
  const [docs, setDocs] = useState([
    {id:0, title:"A", desc:"AAAA"},
    {id:1, title:"B", desc:"BBBB"},
    {id:2, title:"C", desc:"CCCC"}
  ]);
  const [nextId, setNextId] = useState(docs.length)
  const [id, setId] = useState(null);

  let content = "";
  if(mode === "WELCOME"){
    content = 
    <div>
      <WelcomeName name="Visitor"></WelcomeName>
      <a href="/create" onClick={event => {event.preventDefault();setMode("CREATE");}}>Create</a>
    </div>

  }else if(mode === "READ"){
    content = (
      <div>
        <ViewDocument id={id} docs={docs}></ViewDocument>
        <a href="/create" onClick={event => {event.preventDefault();setMode("CREATE");}}>Create</a>
        <a id={id} href={"/update/" + id} onClick={event => {event.preventDefault();setMode("UPDATE"); setId(event.currentTarget.id)}}>Update</a>
        <input id={id} type="button" value="delete" onClick={event => {
        event.preventDefault();
        const newDocs = [];
        for(let i=0; i<docs.length; i++){
          if(docs[i].id !== Number(event.target.id)){
            newDocs.push(docs[i]);
          }
        }
        setDocs(newDocs);
        setMode("WELCOME");
        }}></input>
      </div>
    )
  }else if(mode === "CREATE"){
    content = 
    <div>
      <CreateForm onSubmit={(_title, _desc) => {
        const newDocs = {id:nextId, title:_title, desc:_desc};
        const copyDocs = [...docs];
        copyDocs.push(newDocs);
        setDocs(copyDocs);
        setId(nextId);
        setNextId(nextId+1);
        setMode("READ");
        }}>
      </CreateForm>
      <a href="/create" onClick={event => {event.preventDefault();setMode("CREATE");}}>Create</a>
    </div>
  }else if(mode === "UPDATE"){
    content = (
    <div>
      <UpdateForm id={id} docs={docs} onSubmit={(_id, _title, _desc) => {
        const updateDocs = {id:Number(id), title:_title, desc:_desc};
        const copyDocs = [...docs];

        for(let i=0; i<copyDocs.length; i++){
          if(copyDocs[i].id === Number(id)){
            copyDocs[i] = updateDocs;
            break;
          }
        }

        setDocs(copyDocs);
        setMode("READ");
      }}></UpdateForm>
    </div>
    )
  }

  return (
    <div>
      <a href="/home" onClick={event => {
        event.preventDefault();
        setMode("WELCOME");
      }}>Home</a>

      <DocumentList docs={docs} onChangeMode={_id => {
        setMode("READ");
        setId(_id);
      }}></DocumentList>
      {content}
    </div>
  );
}

function WelcomeName(props){
  return (
    <h1>Hello, {props.name}?</h1>
  )
}

function CreateForm(props){
  return(
    <>
      <h2>Create</h2>
      <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const desc = event.target.desc.value;
      props.onSubmit(title, desc);
      }}>
        <p><input required type="text" name="title" placeholder="title"/></p>
        <p><textarea required name="desc" placeholder="desc"></textarea></p>
        <p><input type="submit" value="Create"></input></p>
      </form>
    </>
  )
}

function UpdateForm(props){
  let docs = null;
  for(let i=0; i<props.docs.length; i++){
    console.log(props.docs[i], Number(props.id));
    if(props.docs[i].id === Number(props.id)){
      docs = props.docs[i];
      break;
    }
  }


  const [title, setTitle] = useState(docs.title);
  const [desc, setDesc] = useState(docs.desc);

  return(
    <>
      <h2>Update</h2>
      <form onSubmit={event => {
        event.preventDefault();
        props.onSubmit(docs.id, title, desc);
        }}>
      <p>
        <input required type="text" name="title" placeholder="title" value={title} onChange={event => {
          setTitle(event.target.value);
        }}/>
      </p>
      <p>
        <textarea required name="desc" placeholder="desc" value={desc} onChange={event => {
          setDesc(event.target.value);
        }}></textarea>
      </p>
      <p>
        <input type="submit" value="Modify"></input>
      </p>
    </form>
    </>
  )
}

function DocumentList(props){
  let content = [];
  for(let i=0; i<props.docs.length; i++){
    let docs = props.docs[i];
    content.push(
      <li key={docs.id}>
        <a id={docs.id} href="/" onClick={event => {
          event.preventDefault();
          props.onChangeMode(event.currentTarget.id);
        }}>
          name:{docs.title}
        </a>
      </li>
    )
  }

  return <ol>{content}</ol>
}

function ViewDocument(props){
  let docs = null;
  for(let i=0; i<props.docs.length; i++){
    if(props.docs[i].id === Number(props.id)){
      docs = props.docs[i];
      break;
    }
  }
  
  return (
    <div>
      <h2>{docs.title}</h2>
      <p>{docs.desc}</p>
    </div>
  )
}

export default App;
