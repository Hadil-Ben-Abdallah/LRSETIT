import React from 'react'
import Header from '../components/HeaderAndFooter/Header'
import Footer from '../components/HeaderAndFooter/Footer'
import Routers from '../routes/Routers'
import Stepper from '../components/Stepper/Steps'

// const Layout = () => {
//   return (
//     <div>
//       <Header />
//       <Stepper/>
//       <main>
//         <Routers />
//       </main>
//       <Footer />
//     </div>
//   )
// }

// export default Layout

import { useLocation } from 'react-router-dom';
const Layout = () => {
  const location = useLocation();
  const excludeComponentsPaths = ['/', '/inscription', '/dashboard', '/contact'];
  

  // Check if the current path is in the excludeComponentsPaths array
  const shouldExcludeComponents = excludeComponentsPaths.includes(location.pathname);

  return (
    <div>
      {!shouldExcludeComponents && <Header />}
      {!shouldExcludeComponents && <Stepper />}
      <main>
        <Routers />
      </main>
      {!shouldExcludeComponents && <Footer />}
    </div>
  );
}

export default Layout;
