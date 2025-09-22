'use client'
import Header from "@/components/header/header";
import { Navbar } from "@/components/navbar/navbar";
import { Grid } from "@mantine/core";

export default function Dashboard(){
  return (
    <>
    <Grid style={{display:"flex"}}>
      <Navbar/>
      <div>
        <Header headerTitle={"Dashboard"} />

      </div>
      
    </Grid>
      
    </>
  )
}