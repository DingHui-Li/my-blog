export default defineNuxtRouteMiddleware((to, from) => {
  if (to.name?.includes("admin") && !to.name?.includes("login")) {
    if (!useSysStore().isLogin) {
      logout();
      return navigateTo("/admin/login");
    }
  }
});
