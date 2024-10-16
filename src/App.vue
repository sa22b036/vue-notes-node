<script setup>
import note from './components/note.vue';
import {ref, watch} from "vue";

const notes = ref([]);
const new_title = ref(null);
const new_content = ref(null);

// SyncHash ist da um Vue eine Änderung des Zustandes zu signalisieren
const syncHash = ref(0);

const baseURL = "http://localhost:8080"

// Falls SyncHash sich ändert, wird Vue die Posts vom server neu holen und darstellen
// SyncHash wird am anfang ausgeführt oder beim hinzufügen oder löschen von einträgen
watch(()=> syncHash.value, retrieveAllPosts,{immediate:true})

// Alle 5 Sekunden wird die SyncHash geändert um reglmäßig neue Daten zu holen
setInterval(()=>{
  syncHash.value++;
},5000)

async function retrieveAllPosts() {
  console.log("Retrieving data from the server")
  const request = await fetch(`${baseURL}/posts`);
  const response = await request.json();
  notes.value = response;
  return Promise.resolve(response);
}

async function savePost(title,content){
  console.log("Saving post to server");
  const requestBody = {
    title, content
  }
  const request = await fetch(`${baseURL}/posts/create`,{
    body: JSON.stringify(requestBody),
    cache: 'no-cache',
    headers:{
      "Content-Type":"application/json"
    },
    method: "POST"
  })
  const response = await request.json();
  console.log(`Saved post with identifier ${response.identifier}`)
  return Promise.resolve(response);
}

async function deletePost(identifier){
  console.log("Deleting post for id "+identifier);
  const request = await fetch(`${baseURL}/posts/delete/${identifier}`,{
    method: "DELETE"
  });
  const deleteItem = await request.json();
  alert(`Delete item '${deleteItem.title}'`)
  syncHash.value++;
}

function handleClick() {
  savePost(new_title.value,new_content.value).then((createdPost)=>{
    syncHash.value++;
  });
}


</script>

<template>
  <div class="allnotes" id="allnotes">
  <div class="note-container note-input">
        <input type="text" v-model="new_title" /><br />
        <textarea v-model="new_content" />
        <button class="input-button" @click="handleClick">Add</button>
    </div>
    <note v-for="(n, i) in notes" v-bind:key="i" :index="i" :identifier="n.identifier" :title="n.title" :content="n.content" @deletion-event="deletePost" />
  </div>
</template>

<style scoped>
/* Notizen */
.allnotes {
  display: flex;
  gap: 10px;
  padding: 20px;
}

/* EingabeButton */
.input-button {
  font-size: 30px;
  cursor: pointer;
}


.note-container {
  width: 400px;
  border: 3px solid red;
  border-radius: 10px;
  padding-left: 10px;
  background-color: yellow;
  position: relative;
}

/* DeleteButton */
.delete-button {
  background-color:white;
  color: black;
  border: 2px solid black;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
}

.delete-button::before {
  content: "🗑️";
      color: red;
      margin-right: 5px;
 
}

.delete-button:hover {
  background-color: yellow;
}
</style>
