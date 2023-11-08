/** @jsxImportSource @emotion/react */
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";

export type Name = {
  firstName: string;
  lastName: string;
};

export type PhoneNumber = {
  number: string;
};

export type HandleSubmitFormProps = {
  name: Name;
  phoneNumber: PhoneNumber[];
};

interface ModalFormContactProps {
  defaultName?: Name;
  defaultPhoneNumber?: PhoneNumber[];
  isLoading?: boolean;
  handleSubmit: ({ name, phoneNumber }: HandleSubmitFormProps) => void;
  isLoadSubmit?: boolean;
}

const ModalFormContact = ({
  defaultName,
  defaultPhoneNumber,
  isLoading,
  handleSubmit,
  isLoadSubmit,
}: ModalFormContactProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState<Name>({
    firstName: defaultName?.firstName || "",
    lastName: defaultName?.lastName || "",
  });

  const [phoneNumber, setPhoneNumber] = useState<PhoneNumber[]>([
    ...(defaultPhoneNumber || [{ number: "" }]),
  ]);

  useEffect(() => {
    if (defaultName?.firstName && defaultName?.lastName) {
      setName({
        firstName: defaultName.firstName,
        lastName: defaultName.lastName,
      });
    }
  }, [defaultName]);

  useEffect(() => {
    if (defaultPhoneNumber && defaultPhoneNumber.length > 0) {
      setPhoneNumber(defaultPhoneNumber);
    }
  }, [defaultPhoneNumber]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setName((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePhoneChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setPhoneNumber((prevState) => {
      const newState = [...prevState];
      newState[index] = { number: value };
      return newState;
    });
  };

  const addPhoneNumber = () => {
    setPhoneNumber((prevState) => [...prevState, { number: "" }]);
  };

  const removePhoneNumber = (index: number) => {
    setPhoneNumber((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  };

  return (
    <section css={{ position: "fixed", inset: 0, zIndex: 50 }}>
      <div
        onClick={() => navigate(-1)}
        css={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(12px)",
        }}
      />

      {isLoading ? (
        <div
          css={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            width: 48,
            height: 48,
          }}
        >
          <span className="loader"></span>
        </div>
      ) : (
        <form
          css={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "20px 0",
            borderRadius: "0.5rem",
            boxShadow: "-1px 1px 4px 1px rgba(0, 0, 0, 0.2)",
            background: "white",
            maxWidth: "640px",
            width: "90%",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit({ name, phoneNumber });
          }}
        >
          <img
            css={{
              borderRadius: "100%",
              width: "5rem",
              height: "5rem",
              margin: "0 auto",
              marginTop: -60,
            }}
            src={`https://ui-avatars.com/api/?name=${
              name.firstName + "%20" + name.lastName
            }&background=random&size=262&font-size=0.4`}
          />

          <div
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              maxHeight: "70vh",
              overflowY: "auto",
              padding: "12px 20px",
            }}
          >
            <div
              css={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
              }}
            >
              <FormInput
                label="First Name"
                value={name.firstName}
                onChange={handleNameChange}
                name="firstName"
                placeholder="Your First Name"
              />

              <FormInput
                label="Last Name"
                value={name.lastName}
                onChange={handleNameChange}
                name="lastName"
                placeholder="Your Last Name"
              />
            </div>

            <div
              css={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                width: "100%",
              }}
            >
              {phoneNumber.map((phone, index) => (
                <FormInput
                  key={index}
                  type="phoneNumber"
                  value={phone.number}
                  onChange={(event) => handlePhoneChange(event, index)}
                  label={index > 0 ? `Phone ${index + 1}` : "Phone"}
                  name="number"
                  placeholder="Phone Number"
                  isShowRemoveBtn={index !== 0}
                  onClickRemoveBtn={() => removePhoneNumber(index)}
                />
              ))}

              <button
                type="button"
                css={{
                  color: "#1a73e8",
                  width: "fit-content",
                }}
                onClick={addPhoneNumber}
              >
                Add Phone
              </button>
            </div>
          </div>

          <div
            css={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "0 20px",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="button"
              onClick={() => navigate(-1)}
              css={{
                padding: "12px 20px",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              css={{
                padding: "12px 20px",
                background: "#1a73e8",
                borderRadius: 8,
                color: "white",
              }}
              disabled={isLoadSubmit}
              // disabled={name === contact?.name && number === contact?.number}
            >
              {isLoadSubmit ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default ModalFormContact;
