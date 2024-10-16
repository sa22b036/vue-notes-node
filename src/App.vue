<script setup>
import note from './components/note.vue';
import {ref, watch} from "vue";

const notes = ref(JSON.parse(localStorage.getItem("notes")) || []);
const new_title = ref(null);
const new_content = ref(null);

const syncHash = 0;

watch(()=> syncHash, retrieveAllPosts,{immediate:true})

async function retrieveAllPosts() {
  console.log("Retrieving data from the server")
  const request = await fetch("http://localhost:8080/posts");
  const response = await request.json();
  return Promise.resolve(response);
}

function handleClick() {
  if(new_title) {
    notes.value.push({title: new_title.value, content: new_content.value});
  }
  localStorage.setItem("notes", JSON.stringify(notes.value));
}

function deleteNote(index) {
  notes.value.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes.value));
}
</script>

<template>
  <div class="allnotes" id="allnotes">
  <div class="note-container note-input">
        <input type="text" v-model="new_title" /><br />
        <textarea v-model="new_content" />
        <button class="input-button" @click="handleClick">Add</button>
    </div>
    <note v-for="(n, i) in notes" v-bind:key="i" :index="i" :title="n.title" :content="n.content" @deletion-event="deleteNote" />
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
