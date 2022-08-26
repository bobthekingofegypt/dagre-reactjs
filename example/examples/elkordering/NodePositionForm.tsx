import './nodePositionForm.css';

import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as React from 'react';

export interface MyFormValues {
  node0: string;
  node1: string;
  node2: string;
  node3: string;
  node4: string;
  node5: string;
  node6: string;
  node7: string;
  node8: string;
  node9: string;
  node10: string;
  pullUp: boolean;
}

const initialValues = {
  node0: '0',
  node1: '0',
  node2: '0',
  node3: '0',
  node4: '0',
  node5: '0',
  node6: '0',
  node7: '0',
  node8: '0',
  node9: '0',
  node10: '0',
  pullUp: true,
};

interface NodePositionFormProps {
  orderChanged: (values: number[], pullUp: boolean) => void;
}

export const NodePositionForm: React.FC<NodePositionFormProps> = ({
  orderChanged,
}) => {
  return (
    <Formik<MyFormValues>
      initialValues={initialValues}
      onSubmit={(
        values: MyFormValues,
        { setSubmitting }: FormikHelpers<MyFormValues>
      ) => {
        orderChanged(
          [
            parseInt(values.node0),
            parseInt(values.node1),
            parseInt(values.node2),
            parseInt(values.node3),
            parseInt(values.node4),
            parseInt(values.node5),
            parseInt(values.node6),
            parseInt(values.node7),
            parseInt(values.node8),
            parseInt(values.node9),
            parseInt(values.node10),
          ],
          values.pullUp
        );
        setSubmitting(false);
      }}
    >
      <Form className="NodePositionForm">
        <div className="container">
          <label htmlFor="node0">Pull up nodes</label>
          <span>
            <Field type="checkbox" name="pullUp" />
          </span>
        </div>
        <div className="container">
          <label htmlFor="node0">Node 0</label>
          <span>
            <Field id="node0" name="node0" placeholder="0" />
          </span>
        </div>
        <div className="container">
          <label htmlFor="node1">Node 1</label>
          <span>
            <Field id="node1" name="node1" placeholder="0" />
          </span>
        </div>
        <div className="container">
          <label htmlFor="node2">Node 2</label>
          <span>
            <Field id="node2" name="node2" placeholder="0" />
          </span>
        </div>
        <div className="container">
          <label htmlFor="node3">Node 3</label>
          <span>
            <Field id="node3" name="node3" placeholder="0" />
          </span>
        </div>
        <div className="container">
          <label htmlFor="node4">Node 4</label>
          <span>
            <Field id="node4" name="node4" placeholder="0" />
          </span>
        </div>
        <div className="container">
          <label htmlFor="node5">Node 5</label>
          <span>
            <Field id="node5" name="node5" placeholder="0" />
          </span>
        </div>
        <div className="container">
          <label htmlFor="node6">Node 6</label>
          <span>
            <Field id="node6" name="node6" placeholder="0" />
          </span>
        </div>
        <div className="container">
          <label htmlFor="node7">Node 7</label>
          <span>
            <Field id="node7" name="node7" placeholder="0" />
          </span>
        </div>
        <div className="container">
          <label htmlFor="node8">Node 8</label>
          <span>
            <Field id="node8" name="node8" placeholder="0" />
          </span>
        </div>
        <div className="container">
          <label htmlFor="node9">Node 9</label>
          <span>
            <Field id="node9" name="node9" placeholder="0" />
          </span>
        </div>
        <div className="container">
          <label htmlFor="node10">Node 10</label>
          <span>
            <Field id="node10" name="node10" placeholder="0" />
          </span>
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
