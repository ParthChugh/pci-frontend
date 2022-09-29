import React from 'react';

function Category() {
  return (
    <>
    </>
  )
}

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: "/"
    }
  }
}
export default Category