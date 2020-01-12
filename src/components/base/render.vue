<!--<template functional>
  <div>xxx</div>
</template>-->
<script>
  export default {
    name: 'RenderCell',
    functional: true,
    props: {
      render: Function
    },
    render(h, ctx) {
      return ctx.props.render(h);
    }
  };
</script>
