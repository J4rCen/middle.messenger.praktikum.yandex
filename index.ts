// utils
import {render} from "./src/utils/render";
import {registerComponent} from "./src/utils/resgiterComponent";

// Partials
import Card from "./src/layouts/card";
import Menu from "./src/layouts/menu";
import Button from "./src/partials/button";
import Input from "./src/partials/input";
import Friend from "./src/partials/friend";
import Image from "./src/partials/image";
import ListItem from "./src/partials/list_item";
import Message from "./src/partials/message";
import Page from "./src/layouts/page";
import ErrorMessage from "./src/partials/error";

// Forms
import FormAuthorization from "./src/partials/form_authorization";
import FormRegistration from "./src/partials/form_registration";
import ProfileInformation from "./src/partials/profile__information";
import FormChangePassword from "./src/partials/change_password";
import FormChangeData from "./src/partials/data_changes";
import FormSendingMessage from "./src/partials/form_sendingMessage";

// Page
import ChatPage from "./src/partials/chat";

registerComponent("card", Card);
registerComponent("menu", Menu);
registerComponent("button", Button);
registerComponent("input", Input);
registerComponent("image", Image);
registerComponent("friend", Friend);
registerComponent("listItem", ListItem);
registerComponent("message", Message);
registerComponent("page", Page);
registerComponent("error", ErrorMessage)

registerComponent("FormAuthorization", FormAuthorization);
registerComponent("FormRegistration", FormRegistration);
registerComponent("ProfileInformation", ProfileInformation);
registerComponent("FormChangePassword", FormChangePassword);
registerComponent("FormChangeData", FormChangeData);
registerComponent("FormSendingMessage", FormSendingMessage)

registerComponent("ChatPage", ChatPage)

window.addEventListener("DOMContentLoaded", () => {
    render("login")
})
