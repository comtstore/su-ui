var P=Object.defineProperty;var k=(r,n,e)=>n in r?P(r,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[n]=e;var o=(r,n,e)=>k(r,typeof n!="symbol"?n+"":n,e);import{j as a}from"./jsx-runtime-DEdD30eg.js";import{r as i}from"./index-RYns6xqu.js";import{o as F,a as h,b as W,m as I,u as L,c as S}from"./index-BA3eF1Lg.js";import"./index-D16Yfzz8.js";var A=Object.defineProperty,p=(r,n,e,t)=>{for(var s=void 0,g=r.length-1,l;g>=0;g--)(l=r[g])&&(s=l(n,e,s)||s);return s&&A(n,e,s),s};const u=new Map;class c extends W{constructor(){super();o(this,"groupId","");o(this,"initialGroup",e=>{if(this.groupId){const t=u.get(this.groupId);t&&(t.delete(this),t.size===0&&u.delete(this.groupId))}if(this.groupId=e,e){let t=u.get(e);t||(t=new Set,u.set(e,t)),t.add(this)}});o(this,"isDragging",!1);o(this,"groupDo",e=>{var s;const t=this.props.group;t&&((s=u.get(t))==null||s.forEach(e))});o(this,"startDragging",()=>{this.isDragging=!0,this.groupDo(e=>{e.isDragging=!0})});o(this,"stopDragging",()=>{this.isDragging=!1,this.groupDo(e=>{e.isDragging=!1})});o(this,"inDragging",e=>{var t,s;this.isDragging&&((s=(t=this.props).onDragging)==null||s.call(t,e))});I(this)}}p([F],c.prototype,"isDragging");p([h],c.prototype,"startDragging");p([h],c.prototype,"stopDragging");p([h],c.prototype,"inDragging");function m(r){const[n]=i.useState(()=>new c);return i.useEffect(()=>{n.updateProps(r)},[r]),i.useEffect(()=>{n.initialGroup(r.group)},[r.group]),i.useEffect(()=>(window.addEventListener("mousemove",n.inDragging),window.addEventListener("mouseup",n.stopDragging),()=>{window.removeEventListener("mousemove",n.inDragging),window.removeEventListener("mouseup",n.stopDragging)})),L(()=>{var e,t;return a.jsx("div",{className:S("draggle-line",(e=r.classes)==null?void 0:e.root,r.className),style:{...r.style,...(t=r.styles)==null?void 0:t.root},onMouseDown:n.startDragging,children:n.isDragging?a.jsx("div",{className:"line"}):null})})}try{m.displayName="DraggleBar",m.__docgenInfo={description:"",displayName:"DraggleBar",props:{group:{defaultValue:null,description:"组，当draggleBar被拖动时，会触发整个组中的所有的draggleBar的拖动事件",name:"group",required:!1,type:{name:"string"}},onDragging:{defaultValue:null,description:`当被拖动时
@param e
@returns`,name:"onDragging",required:!1,type:{name:"((e: any) => void)"}},classes:{defaultValue:null,description:"classes",name:"classes",required:!1,type:{name:"{ root?: string; }"}},styles:{defaultValue:null,description:"styles",name:"styles",required:!1,type:{name:"{ root?: CSSProperties; }"}}}}}catch{}const V={title:"基础组件/DraggleBar",component:m,parameters:{layout:"centered",docs:{description:{component:"DraggleBar组件用于表示一个可以被拖拽的位置，并在被拖拽时执行行为，比如改变其他元素的长度。"},source:{language:"tsx"}}},tags:["autodocs"],argTypes:{group:{control:"text"}}};function D(r){var l;const n=i.useRef(null),e=i.useRef(!1),[t,s]=i.useState(50),g=i.useCallback(j=>{var x;if(e.current)return;e.current=!0;const y=(x=n.current)==null?void 0:x.getBoundingClientRect();if(!y){e.current=!1;return}const{x:E}=y,b=Math.max(j.clientX-E,50);s(b),e.current=!1},[e]);return a.jsxs("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:100,...((l=r.styles)==null?void 0:l.demo)??{}},children:[a.jsx("div",{ref:n,style:{height:"100%",width:t,backgroundColor:"var(--su-theme-color)"}}),a.jsx(m,{...r,onDragging:g}),a.jsx("div",{style:{height:"100%",width:200,backgroundColor:"var(--su-theme-color__hover)"}})]})}const d={name:"基础使用",parameters:{docs:{description:{story:"DraggleBar组件的基础使用。"},source:{language:"tsx",code:`
function PrimaryDemo(args: DraggleBarProps) {
  const leftBoxRef = useRef(null);
  const isDragging = useRef(false);
  const [leftWidth, setLeftWidth] = useState(50);

  const onDragging = useCallback(
    (e) => {
      if (isDragging.current) return;
      isDragging.current = true;
      const leftBoxRect = leftBoxRef.current?.getBoundingClientRect();
      if (!leftBoxRect) {
        isDragging.current = false;
        return;
      }
      const { x: leftDistance } = leftBoxRect;
      const width = Math.max(e.clientX - leftDistance, 50);
      setLeftWidth(width);
      isDragging.current = false;
    },
    [isDragging],
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        ...(args.styles?.demo ?? {}),
      }}
    >
      <div
        ref={leftBoxRef}
        style={{
          height: "100%",
          width: leftWidth,
          backgroundColor: "var(--su-theme-color)",
        }}
      />
      <DraggleBar {...args} onDragging={onDragging} />
      <div
        style={{
          height: "100%",
          width: 200,
          backgroundColor: "var(--su-theme-color__hover)",
        }}
      />
    </div>
  );
}
        `}}},render:function(r){return a.jsx(D,{...r})}},f={name:"多DraggleBar成组",parameters:{docs:{description:{story:"DraggleBar组件可以通过成组而同时控制多个拖拽条。"},source:{language:"tsx"}}},render:function(r){return a.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:[a.jsx(D,{...r,styles:{demo:{marginBottom:10}}}),a.jsx(D,{...r})]})},args:{group:"group1"}};var v,B,C;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "基础使用",
  parameters: {
    docs: {
      description: {
        story: "DraggleBar组件的基础使用。"
      },
      source: {
        language: "tsx",
        code: \`
function PrimaryDemo(args: DraggleBarProps) {
  const leftBoxRef = useRef(null);
  const isDragging = useRef(false);
  const [leftWidth, setLeftWidth] = useState(50);

  const onDragging = useCallback(
    (e) => {
      if (isDragging.current) return;
      isDragging.current = true;
      const leftBoxRect = leftBoxRef.current?.getBoundingClientRect();
      if (!leftBoxRect) {
        isDragging.current = false;
        return;
      }
      const { x: leftDistance } = leftBoxRect;
      const width = Math.max(e.clientX - leftDistance, 50);
      setLeftWidth(width);
      isDragging.current = false;
    },
    [isDragging],
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        ...(args.styles?.demo ?? {}),
      }}
    >
      <div
        ref={leftBoxRef}
        style={{
          height: "100%",
          width: leftWidth,
          backgroundColor: "var(--su-theme-color)",
        }}
      />
      <DraggleBar {...args} onDragging={onDragging} />
      <div
        style={{
          height: "100%",
          width: 200,
          backgroundColor: "var(--su-theme-color__hover)",
        }}
      />
    </div>
  );
}
        \`
      }
    }
  },
  render: function (args) {
    return <PrimaryDemo {...args} />;
  }
}`,...(C=(B=d.parameters)==null?void 0:B.docs)==null?void 0:C.source}}};var R,w,_;f.parameters={...f.parameters,docs:{...(R=f.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: "多DraggleBar成组",
  parameters: {
    docs: {
      description: {
        story: "DraggleBar组件可以通过成组而同时控制多个拖拽条。"
      },
      source: {
        language: "tsx"
      }
    }
  },
  render: function (args) {
    return <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
        <PrimaryDemo {...args} styles={{
        demo: {
          marginBottom: 10
        }
      }} />
        <PrimaryDemo {...args} />
      </div>;
  },
  args: {
    group: "group1"
  }
}`,...(_=(w=f.parameters)==null?void 0:w.docs)==null?void 0:_.source}}};const X=["Primary","Group"];export{f as Group,d as Primary,X as __namedExportsOrder,V as default};
