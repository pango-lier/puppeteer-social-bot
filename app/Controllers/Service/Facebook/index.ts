import hook from "./hook";
import Fanpage from "./src/lib/Fanpage";
import Group from "./src/lib/Group";
import Login from "./src/lib/Login";

class Facebook {
  FanPage = new Fanpage();
  Group = new Group();
  Login = new Login();
  Hook = new hook();
}
export default new Facebook();
