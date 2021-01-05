import React, { useEffect, useRef, useState } from "react"
import { Header } from "../components/Header"
import { Lolly } from "../components/lolly"
import { useMutation, useQuery } from "@apollo/client"
import gql from "graphql-tag"
import Share from "../../src/components/Share"
import shortid from "shortid"



const ADD_LOLLY = gql`
  mutation createVlolly($lolly: VlollyInput) {
    createVlolly(lolly: $lolly) {
      id
      receiver
      message
      sender
      top
      middle
      bottom
    }
  }
`

export default function newLolly() {
  const [createVlolly, { data }] = useMutation(ADD_LOLLY)
  const [flavourTop, setFlavourTop] = useState("#ef0078")
  const [flavourMiddle, setFlavourMiddle] = useState("#ff8d00")
  const [flavourEnd, setFlavourEnd] = useState("#dd0074")
  const [recipentName, setRecipentName] = useState("")
  const [message, setMessage] = useState("")
  const [senderName, setSenderName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)

    const lolly = {
      id: shortid.generate(),
      receiver: recipentName,
      sender: senderName,
      message: message,
      top: flavourTop,
      middle: flavourMiddle,
      bottom: flavourEnd,
    }
    console.log("Creating Todo:", lolly)

    const data = await createVlolly({
      variables: {
        lolly: lolly,
      },
    })
    setLoading(false)
    console.log(data)
  }

  return (
    <div className="container">
      <Header />

      {!data ? (
        <>
          {" "}
          <div className="lollyFormDiv">
            <div>
              <Lolly
                fillLollyBottom={flavourEnd}
                fillLollyMiddle={flavourMiddle}
                fillLollyTop={flavourTop}
              />
            </div>
            <div className="lollyFlavourDiv">
              <label>
                <input
                  type="color"
                  name="top"
                  value={flavourTop}
                  onChange={e => setFlavourTop(e.target.value)}
                />
              </label>
              <label>
                <input
                  type="color"
                  name="middle"
                  value={flavourMiddle}
                  onChange={e => setFlavourMiddle(e.target.value)}
                />
              </label>
              <label>
                <input
                  type="color"
                  name="bottom"
                  value={flavourEnd}
                  onChange={e => setFlavourEnd(e.target.value)}
                />
              </label>
            </div>
            <div className="formContainer">
              <label>To</label>
              <input
                type="text"
                required
                onChange={e => setRecipentName(e.target.value)}
              />
              <label>Message</label>
              <textarea
                style={{ resize: "none" }}
                rows={7}
                required
                onChange={e => setMessage(e.target.value)}
              />
              <label>From</label>
              <input
                type="text"
                required
                onChange={e => setSenderName(e.target.value)}
              />
              <div className="formBtn-wrapper">
                <button onClick={handleSubmit}>Freeze Lolly</button>
              </div>
            </div>
          </div>
        </>
      ) : (
          <Share
          id={data?.createVlolly?.id}
          receiver={data?.createVlolly?.receiver}
          sender={data?.createVlolly?.sender}
          message={data?.createVlolly?.message}
          />
        )}
    </div>
  )
}