<template lang="pug">
.topic-tag(@click.stop="handleClick") \#{{ data.name }}
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
  display: inline-block;
  // padding: 4px 10px;
  margin-right: 10px;
  // background: #000;
  cursor: pointer;
  color: #3f51b5;
  font-weight: bold;
  font-size: 14px;

  &:hover {
    opacity: 0.8;
  }
}
</style>
