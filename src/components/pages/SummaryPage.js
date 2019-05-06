import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import SummaryBox from "../SummaryBox";
// import withTransactions from "../withTransactions";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Content from "../layout/Content";
import IntervalButtonGroup from "../IntervalButtonGroup";
import WideButton from "../WideButton";
import BackIcon from "../../icons/arrow_back.svg";
import useTransactions from "./useTransactions";

import { transactionBoxMargin, globalLightBlue } from "../../constants";

const SummaryList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-shrink: 0;
  margin-bottom: ${transactionBoxMargin};
  height: 100%;
`;

const SummaryPage = ({ history }) => {
  const [interval, setInterval] = useState("all");
  const [transactions, setTransactions] = useTransactions();

  const getSum = (total, item) => total + item;

  const getValues = transactions => {
    const values = [0];
    transactions.forEach(transaction => {
      values.push(
        transaction.type === "in" ? transaction.value : -transaction.value
      );
    });
    return values;
  };

  const getSummary = type => {
    if (type !== "all") {
      const filteredArray = transactions.filter(
        transaction => transaction.type === type
      );
      return getValues(filteredArray).reduce(getSum);
    } else {
      return getValues(transactions).reduce(getSum);
    }
  };

  return (
    <>
      <Header>
        <IntervalButtonGroup
          selected={interval}
          setInterval={setInterval}
          intervalTypes={["day", "month", "all"]}
        />
      </Header>
      <Content>
        <SummaryList>
          <SummaryBox level={"in"} summary={getSummary("in")} />
          <SummaryBox level={"out"} summary={getSummary("out")} />
          <SummaryBox level={"all"} summary={getSummary("all")} />
        </SummaryList>
      </Content>
      <Footer>
        <WideButton
          onClick={() => history.push("/")}
          label={"Back"}
          bgColor={globalLightBlue}
          icon={BackIcon}
        />
      </Footer>
    </>
  );
};

export default withRouter(SummaryPage);
