<template lang="pug">
.topic-tag(@click.stop="handleClick") {{ data.name }}
</template>
<script setup>
const props = defineProps({
  data: Object,
  clickable: {
    type: Boolean,
    default: true,
  },
});

const router = useRouter();
const route = useRoute();

function handleClick() {
  if (props.clickable) {
    if (route.fullPath.includes("/topic/")) {
      router.replace("/topic/" + props.data._id);
    } else {
      router.push("/topic/" + props.data._id);
    }
  }
}
</script>
<style lang="scss" scoped>
.topic-tag {
  font-size: 12px;
  border-radius: 30px;
  padding: 4px 10px;
  margin-right: 10px;
  transition: all 0.3s;
  background: #000;
  color: #fff;
  cursor: pointer;
}
</style>
