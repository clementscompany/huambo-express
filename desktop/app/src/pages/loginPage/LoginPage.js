import { ModalComponents } from "../../components/modalComponents.js";
import { HTTPRequest } from "../../hooks/http.js";
import { StringValidate } from "../../hooks/Validations.js";
import { Navigate } from "../../Routes.js";
import { LoginScreen } from "../../screens/login/login.screen.js";

class LoginPage {
  constructor(mainContainer) {
    this.mainContainer = mainContainer;
    this.LogIn(this.mainContainer);
  }

  LogIn(mainContainer) {
    ModalComponents.miniSpinner(mainContainer);
    const is_loged = sessionStorage.getItem("is_loged");
    setTimeout(() => {
      if (!is_loged) {
        mainContainer.innerHTML = LoginScreen.renderPage({});
        this.validateLogin(mainContainer);
        ModalComponents.closeMiniSpinner(mainContainer);
        return;
      }

      Navigate("/home");
      ModalComponents.closeMiniSpinner(mainContainer);
    }, 2000)

  }

  validateLogin(maincontainer) {
    maincontainer.querySelector("#loginForm").addEventListener("submit", (event) => {
      event.preventDefault();
    });

    maincontainer.querySelector("#loginButton").addEventListener("click", async (event) => {
      event.preventDefault();
      const username = maincontainer.querySelector("#username").value;
      const password = maincontainer.querySelector("#password").value;
      ModalComponents.miniSpinner(maincontainer);
      const inputValues = Array.from([{ login: username, senha: password }]);
      const validate = StringValidate(inputValues);

      if (!validate) {
        setPopUp({ mainContainer, message: "Preencha todos os campos", status: "error", title: "Erro de validção!" })
        ModalComponents.closeMiniSpinner(maincontainer)
        return;
      }
      try {
        const sendData = await HTTPRequest.post({ uri: "/auth/login", body: inputValues[0] });
        const { success, message } = sendData;
        if (!success) {
          setPopUp({ mainContainer, message, status: "error", title: "Credenciais incorretas!" });
          ModalComponents.closeMiniSpinner(maincontainer);
          return;
        }

        sessionStorage.setItem("is_loged", "true");
        sessionStorage.setItem("token", sendData?.token);
        ModalComponents.closeMiniSpinner(maincontainer);
        Navigate("/home");

      } catch (error) {
        setPopUp({ mainContainer, message: error?.message, status: "error", title: "Erro no envio dos dados" })
      }
      setTimeout(() => {
        ModalComponents.closeMiniSpinner(maincontainer)
      }, 2000);
    });

    const setPopUp = ({ mainContainer, message, status, title, showCancelButton = false }) => {
      ModalComponents.popUpAlert({ mainContainer, message, status, title, showCancelButton })
      const closeButton = maincontainer.querySelector(".closeButton");
      closeButton.addEventListener("click", () => {
        ModalComponents.closePopUp(maincontainer);
      })
    }
  }
}
export default LoginPage;
