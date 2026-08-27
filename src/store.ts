import {useEffect,useMemo,useState} from "react";
export type Result={phaseId:number;score:number;passed:boolean;takenAt:string};
export type ShippedProject={id:string;title:string;phaseId:number;repository:string;liveUrl:string;summary:string;shippedAt:string};
export type LessonSubmission={lessonId:string;explanation:string;implementation:string;failures:string;tradeoffs:string;submittedAt:string};
export type CodeFile={name:string;content:string};
export type CodeSubmission={lessonId:string;files:CodeFile[];submittedAt:string};
type Data={results:Result[];projects:ShippedProject[];completedLessons:string[];lessonSubmissions:LessonSubmission[];workspaces:Record<string,CodeFile[]>;codeSubmissions:CodeSubmission[]};
const key="engineeros-evidence-v1";
const empty:Data={results:[],projects:[],completedLessons:[],lessonSubmissions:[],workspaces:{},codeSubmissions:[]};
export function useEvidence(){
 const [data,setData]=useState<Data>(()=>{try{const saved=JSON.parse(localStorage.getItem(key)||"");return saved?{...empty,...saved}:empty}catch{return empty}});
 useEffect(()=>localStorage.setItem(key,JSON.stringify(data)),[data]);
 const saveResult=(result:Result)=>setData(d=>({...d,results:[...d.results.filter(x=>x.phaseId!==result.phaseId),result]}));
 const addProject=(project:ShippedProject)=>setData(d=>({...d,projects:[...d.projects,project]}));
 const removeProject=(id:string)=>setData(d=>({...d,projects:d.projects.filter(x=>x.id!==id)}));
 const toggleLesson=(lessonId:string)=>setData(d=>({...d,completedLessons:d.completedLessons.includes(lessonId)?d.completedLessons.filter(x=>x!==lessonId):[...d.completedLessons,lessonId]}));
 const submitLesson=(submission:LessonSubmission)=>setData(d=>({...d,completedLessons:d.codeSubmissions.some(x=>x.lessonId===submission.lessonId)?[...new Set([...d.completedLessons,submission.lessonId])]:d.completedLessons,lessonSubmissions:[...d.lessonSubmissions.filter(x=>x.lessonId!==submission.lessonId),submission]}));
 const saveWorkspace=(lessonId:string,files:CodeFile[])=>setData(d=>({...d,workspaces:{...d.workspaces,[lessonId]:files}}));
 const submitCode=(submission:CodeSubmission)=>setData(d=>({...d,completedLessons:d.lessonSubmissions.some(x=>x.lessonId===submission.lessonId)?[...new Set([...d.completedLessons,submission.lessonId])]:d.completedLessons,workspaces:{...d.workspaces,[submission.lessonId]:submission.files},codeSubmissions:[...d.codeSubmissions.filter(x=>x.lessonId!==submission.lessonId),submission]}));
 const reset=()=>setData(empty);
 const passed=useMemo(()=>data.results.filter(x=>x.passed).length,[data.results]);
 return {...data,passed,saveResult,addProject,removeProject,toggleLesson,submitLesson,saveWorkspace,submitCode,reset};
}
