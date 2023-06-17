export default defineNuxtRouteMiddleware((to, from) => {
  if (to.name?.includes("admin") && !to.name?.includes("login")) {
    if (false) {
      logout();
      return navigateTo("/admin/login");
    }
  }
});
