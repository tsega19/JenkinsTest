import { Protected } from "./Router/Routers";
import worker_script from './Worker/worker';

let worker: Worker;

function App() {
  return (
    <>
      <div>
        <Protected />
      </div>
    </>
  );
}

export default App;
