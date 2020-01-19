module.exports = function (content, demoComponent) {
  const template = `
<template>
<div>${content}</div>
</template>
<script>
export default {
  components:{
    ${demoComponent}
  }
}
</script>
  `
  return template
}