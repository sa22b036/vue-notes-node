<script setup>
const props = defineProps({
    index: Number,
    title: String,
    content: String
});


</script>

<template>
    <div class="note-container">
        <h4 class="note-title">
            {{ title }}
        </h4>
        <p class="note-content">
            {{ content }}
        </p>
        <button class="delete-button" @click="$emit('deletion-event', props.index)"/>
    </div>
</template>

<style lang="css" scoped>


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