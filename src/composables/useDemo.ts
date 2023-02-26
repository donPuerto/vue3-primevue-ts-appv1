import { ref } from "vue";

const demo = ref("Demo Function");

const demoFunc = () => {
  return demo;
};

export default function useDemo() {
  return {
    demoFunc,
  };
}
