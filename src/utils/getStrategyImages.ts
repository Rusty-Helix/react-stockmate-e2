// @ts-nocheck
const fetchImages = (context: string) => {
    const images = {};
    const cache = {};
    function importAll(r) {
      r.keys().forEach((key) => (cache[key] = r(key)));
    }
    importAll(context);
    Object.entries(cache).forEach((module: string[]) => {
      let key = module[0].split("");
      key.splice(0, 2);
      key.splice(-4, 4);
      images[[key.join("")]] = module[1];
    });
    return images;
  };
  
  export const images = fetchImages(
    require.context("../assets/strategy-illustrations", false, /\.(jpg|png|jpe?g|svg)$/)
    // require.context("../assets/strategies/shiny", false, /\.(png|jpe?g|svg)$/)
  );
  export const defaultImages = fetchImages(
    require.context("../assets/strategy-illustrations", false, /\.(jpg|png|jpe?g|svg)$/)
    // require.context("../assets/strategies/default", false, /\.(png|jpe?g|svg)$/)
  );

// // const strategyIllustrations = () => {
// const fetchIllustrations = (context: string) => {
//   // const illustrations = {}
//   // function importAll(r) {
//     let illustrations = {};
//     console.log(context)
//     console.log(context.keys())
//     context.keys().map(item => { illustrations[item.replace('./', '')] = r(item); });
//     return illustrations;
//   // }
//   // importAll(context)
// }


  // console.log(illustrations)
  // return illustrations
// }
// export const illustrations = strategyIllustrations()
// export const illustrations = fetchIllustrations(
//   require.context('../assets/strategy-illustrations', false, '/\.jpg/'
// ));