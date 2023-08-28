import { LoginPage } from "../pages/login";
import { RegistrationPage } from "../pages/registration";
import { MenuPage } from "../pages/menu";
import ProfilePage from "../pages/profile";
import ChangePasswordPage from "../pages/change_password";
import ChangeDataPage from "../pages/data_changes";
import ChatPage from "../partials/chat";
import Error500Page from "../pages/error_500";
import Error404Page from "../pages/error_404";

const ROUTES = {
  "login": LoginPage,
  "registration": RegistrationPage,
  "menu": MenuPage,
  "profile": ProfilePage,
  "changePassword": ChangePasswordPage,
  "changeData": ChangeDataPage,
  "chat": ChatPage,
  "error500": Error500Page,
  "error404": Error404Page
}

export function render(name: keyof typeof ROUTES) {
  const root = document.querySelector('#root')!;

  root.innerHTML = '';

  const Page = ROUTES[name];

  const page = new Page();

  root.append(page.getContent()!);

  page.dispatchComponentDidMount();
}
