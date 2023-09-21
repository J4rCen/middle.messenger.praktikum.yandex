import { EventBus } from "./EventBus";
import { set } from "./helpers";
import { User } from "../api/userAPI";
import Block from "./Block";
import { ChatInfo } from "../api/chatAPI";
import {Messages} from "../controllers/MessagesController"

export enum StoreEvents {
  Updated = 'updated'
}

interface State {
  user: User;
  chats: ChatInfo[];
  messages: Record<number, Messages[]>;
  selectedChat?: number;
}

export class Store extends EventBus {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private state: any = {};
  
  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);
    this.emit(StoreEvents.Updated, this.getState());
  }
  
  public getState() {
    return this.state;
  }
}

const store = new Store();

export function withStore<SP>(mapStateToProps: (state: State) => SP) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function wrap<P>(Component: typeof Block<any>) {
        return class WithStore extends Component {
            constructor(props: Omit<P, keyof SP>) {
                let priviousState = mapStateToProps(store.getState());

                super({...(props as P), ...priviousState});

                store.on(StoreEvents.Updated, () => {
                    const stateProps = mapStateToProps(store.getState())
                    priviousState = stateProps;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.setProps({...stateProps as Block<any>})
                })
            }
        }
    }
}


export default store
