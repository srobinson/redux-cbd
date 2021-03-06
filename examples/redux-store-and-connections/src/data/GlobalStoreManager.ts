import {combineReducers, Store, applyMiddleware, createStore, Middleware, Reducer, AnyAction} from "redux";
import {StoreManaged, CBDStoreManager, cbdMiddleware} from "@redux-cbd/core";

/* Custom middlewares. */
import {logInConnectedComponentMiddleware, logInConsoleMiddleware} from "../view/logInMiddlewares";

import {IGlobalStoreState} from "./IGlobalStoreState";
import {DemoReducer, DemoState} from "./demo";

@StoreManaged("GLOBAL_STORE")
export class GlobalStoreManager extends CBDStoreManager<IGlobalStoreState> {

  // Creating store. Singleton instance for whole app. cbdMiddleware is important there, logs are for demo.
  protected createStore(): Store<IGlobalStoreState, AnyAction> {
    const middlewares: Array<Middleware> = [cbdMiddleware, logInConnectedComponentMiddleware, logInConsoleMiddleware];
    return createStore(this.createRootReducer(), applyMiddleware(...middlewares));
  }

  // Creating root reducer based on our application global state.
  // Recommend to create model/module related ones instead of page-related. For example: auth, userSetting etc.
  private createRootReducer(): Reducer<IGlobalStoreState> {
    return combineReducers( {
      demoReducer: new DemoReducer().asFunctional(new DemoState(), { freezeState: true })
    });
  }

}
