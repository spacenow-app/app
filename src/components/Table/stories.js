import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Table from "./Table";

storiesOf("Table", module).add("Default", () => (
  <Table onClick={action("clicked")}>Hello Table</Table>
));
