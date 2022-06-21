import Fanpage from "./src/lib/Fanpage";
import Group from "./src/lib/Group";
import Login from "./src/lib/Login";

class Facebook {
  FanPage = new Fanpage();
  Group = new Group();
  Login = new Login();
}
export default new Facebook();
