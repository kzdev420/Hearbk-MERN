import React, { useState, useCallback } from "react";
import { Table, Radio } from "antd";
import content from "./content";
import "./styles.scss";
import Button from "../../../common/Button";

const PrivacyPolicy = (props) => {
  const [disableGATracking, setDisableGATracking] = useState(false);
  const [disableTwitterTracking, setDisableTwitterTrackking] = useState(false);
  const [disableCrisp, setDisableCrispChat] = useState(false);

  const handleSaveClick = useCallback(() => {
    if (disableGATracking) {
      window["ga-disable-UA-155311393-1"] = true;
    }
    props.closeClick();
  }, [disableGATracking, props]);
  const dataSource = content.DATA.map((data) => {
    if (!data.allow) {
      let checkedFlag = false;
      let onChange;
      if (data.key === 1) {
        checkedFlag = disableCrisp;
        onChange = setDisableCrispChat;
      }
      if (data.key === 2) {
        checkedFlag = disableGATracking;
        onChange = setDisableGATracking;
      }
      if (data.key === 3) {
        checkedFlag = disableTwitterTracking;
        onChange = setDisableTwitterTrackking;
      }
      return {
        ...data,
        allow: (
          <div className="radioWrapper">
            <Radio checked={!checkedFlag} onChange={() => onChange(false)}>
              Yes
            </Radio>
            <Radio checked={checkedFlag} onChange={() => onChange(true)}>
              No
            </Radio>
          </div>
        ),
      };
    }
    return data;
  });
  return (
    <div className="privacyContainer">
      <Table
        dataSource={dataSource}
        columns={content.COLUMNS}
        pagination={false}
        bordered
      />
      <Button
        buttonText="Save"
        className="launchButton"
        onClick={handleSaveClick}
      />
    </div>
  );
};

export default PrivacyPolicy;
