import { h as escape_html, k as attr } from "../../chunks/index.js";
function Child_Props($$payload, $$props) {
  let { message, count, boolean } = $$props;
  console.log({ message, count, boolean });
  $$payload.out += `<div><h2>Child component - Props</h2> <p>Message from parent: ${escape_html(message)}</p> <p>Count: ${escape_html(count)}</p> <p>Boolean: ${escape_html(boolean)}</p> <p></p></div>`;
}
function _page($$payload) {
  let message = "Hello from the parent";
  let count = 0;
  let boolean = true;
  $$payload.out += `<h1>Welcome to Parent Component</h1> <input type="text"${attr("value", message)}> <input type="number"${attr("value", count)}> <input type="checkbox"${attr("checked", boolean, true)}> <hr> `;
  Child_Props($$payload, { message, count, boolean });
  $$payload.out += `<!---->`;
}
export {
  _page as default
};
