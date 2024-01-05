module TestGiraffe

open Giraffe.ViewEngine

let nested =
    div
        []
        [
            comment "this is a test"
            h1 [] [ str "Header" ]
            p [] [ rawText "Lorem "; strong [] [ str "Ipsum" ]; str " dollar" ]
        ]

let render _ =
    nested |> RenderView.AsString.xmlNode |> printfn "%A"
