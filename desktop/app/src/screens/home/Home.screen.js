export class HomeScreen {
  static base({ left = false, right }) {
    return (
      `
    <div class="homeContainer">
      ${left !== false &&
      `
        <div class="left">
          ${left}
         </div>
        
        `
      }      
      <div class="right">
        <div id="headerTop"></div>
        <div id="analytics"></div>
      </div>
    </div>
      `
    )
  }
}