"use strict";(self.webpackChunkgatsby_apollo_starter=self.webpackChunkgatsby_apollo_starter||[]).push([[329],{8034:function(t,e,i){i.d(e,{Z:function(){return x}});var n=i(7294),r=i(8037),s=i(8945),o=(i(2066),i(5263)),u=function(t){function e(e){var i=e.options,n=e.context,r=e.setResult,s=t.call(this,i,n)||this;return s.currentObservable={},s.setResult=r,s.initialize(i),s}return(0,s.ZT)(e,t),e.prototype.execute=function(t){if(!0===this.getOptions().skip)return this.cleanup(),{loading:!1,error:void 0,data:void 0,variables:this.getOptions().variables};var e=t;this.refreshClient().isNew&&(e=this.getLoadingResult());var i=this.getOptions().shouldResubscribe;return"function"==typeof i&&(i=!!i(this.getOptions())),!1!==i&&this.previousOptions&&Object.keys(this.previousOptions).length>0&&(this.previousOptions.subscription!==this.getOptions().subscription||!(0,o.D)(this.previousOptions.variables,this.getOptions().variables)||this.previousOptions.skip!==this.getOptions().skip)&&(this.cleanup(),e=this.getLoadingResult()),this.initialize(this.getOptions()),this.startSubscription(),this.previousOptions=this.getOptions(),(0,s.pi)((0,s.pi)({},e),{variables:this.getOptions().variables})},e.prototype.afterExecute=function(){this.isMounted=!0},e.prototype.cleanup=function(){this.endSubscription(),delete this.currentObservable.query},e.prototype.initialize=function(t){this.currentObservable.query||!0===this.getOptions().skip||(this.currentObservable.query=this.refreshClient().client.subscribe({query:t.subscription,variables:t.variables,fetchPolicy:t.fetchPolicy,context:t.context}))},e.prototype.startSubscription=function(){this.currentObservable.subscription||(this.currentObservable.subscription=this.currentObservable.query.subscribe({next:this.updateCurrentData.bind(this),error:this.updateError.bind(this),complete:this.completeSubscription.bind(this)}))},e.prototype.getLoadingResult=function(){return{loading:!0,error:void 0,data:void 0}},e.prototype.updateResult=function(t){this.isMounted&&this.setResult(t)},e.prototype.updateCurrentData=function(t){var e=this.getOptions().onSubscriptionData;this.updateResult({data:t.data,loading:!1,error:void 0}),e&&e({client:this.refreshClient().client,subscriptionData:t})},e.prototype.updateError=function(t){this.updateResult({error:t,loading:!1})},e.prototype.completeSubscription=function(){var t=this;Promise.resolve().then((function(){var e=t.getOptions().onSubscriptionComplete;e&&e(),t.endSubscription()}))},e.prototype.endSubscription=function(){this.currentObservable.subscription&&(this.currentObservable.subscription.unsubscribe(),delete this.currentObservable.subscription)},e}(i(1122).V),a=i(8286),c=i(2441);var l,p=i(3153),b=i(5444),h=i(4767),d=i(8937),v=i(6131),f=i(9335),g=i(737),m=i(9355),O=i(1880),y=(0,i(5185).ZP)(l||(l=(0,O.Z)(["\n  subscription roomUpdated($slug: String!){\n    roomUpdated(slug: $slug){\n      id\n      host\n      slug\n      settings {\n        timeLimit\n        maxPlayers\n        rounds\n      }\n    }\n  }\n"]))),E=function(t){var e=t.room;return n.createElement(n.Fragment,null,(null==e?void 0:e.settings)&&Object.keys(e.settings).map((function(t){return n.createElement(v.ZT,{key:t,variant:"p"},t,": ",null==e?void 0:e.settings[t])})))},x=(0,g.z)((function(t){var e,i,o,l,g,O,x,k,R,C,S=t.user,Z=t.room,D=(0,p.D)(m.Y,{onCompleted:function(t){(0,b.navigate)("/")},onError:function(t){h.Z.danger(f.$.extractGQLErrorMessage(t))}}),_=D[0],z=D[1].loading,P=(e=y,i={variables:{slug:"EYT1o"},onSubscriptionData:function(t){var e=t.subscriptionData;console.log(e.data)}},o=(0,n.useReducer)((function(t){return t+1}),0)[1],l=(0,n.useContext)((0,a.K)()),g=i?(0,s.pi)((0,s.pi)({},i),{subscription:e}):{subscription:e},O=(0,n.useState)({loading:!g.skip,error:void 0,data:void 0}),x=O[0],k=O[1],(R=(0,n.useRef)()).current||(R.current=new u({options:g,context:l,setResult:k})),(C=R.current).setOptions(g,!0),C.context=l,__DEV__&&(0,c.j)(o),(0,n.useEffect)((function(){return C.afterExecute()})),(0,n.useEffect)((function(){return function(){C.cleanup(),R.current=void 0}}),[]),C.execute(x));P.data,P.loading;return n.createElement(d.r,null,n.createElement(v.ZT,{variant:"h3"},"Wait here for host to start game..."),n.createElement(E,{room:Z}),n.createElement(v.J3,null),n.createElement(r.ZP,{to:"/"},n.createElement(v.zx,{className:"mb-4",outline:!0},"Back to home")),S.uid===(null==Z?void 0:Z.host)?n.createElement(v.zx,{className:"mb-4",color:"Crimson",outline:!0,onClick:function(){_({variables:{host:S.uid}})},loading:z},"End game"):null)}))},7320:function(t,e,i){i.r(e);var n=i(7294),r=i(7487),s=i(8034),o=i(9482),u=function(){return n.createElement(n.Fragment,null,n.createElement(r.Z,{title:"Join Game"}),n.createElement(s.Z,null))};e.default=function(){return n.createElement(o.Ar,{title:"Join Game",content:n.createElement(u,null)})}}}]);
//# sourceMappingURL=component---src-pages-lobby-js-c4683a42cf1cf21f574a.js.map