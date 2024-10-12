package types

type WebSocketPackage struct {
	Params string `json:"type"`
	Data interface{} `json:"data"`

}