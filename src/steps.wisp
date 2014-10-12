(Given #"^GET time with data:$"
  (fn [name data done]
    (this.createTemplate name data this.query (fn [err res]
      (done)))
  ))
