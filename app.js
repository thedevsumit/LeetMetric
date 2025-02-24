document.addEventListener("DOMContentLoaded", function () {
    const inputUsername = document.querySelector("#inputUsername")
    const searchButton = document.querySelector("#searchButton")
    const clearButton = document.querySelector("#clearButton")
    const easyCircle = document.querySelector("#easyCircle")
    const mediumCircle = document.querySelector("#mediumCircle")
    const hardCircle = document.querySelector("#hardCircle")
    const easyText = document.querySelector("#easyText")
    const mediumText = document.querySelector("#mediumText")
    const hardText = document.querySelector("#hardText")
    const textFooter1 = document.querySelector("#textFooter1")
    const textFooter2 = document.querySelector("#textFooter2")
    const textFooter3 = document.querySelector("#textFooter3")
    const textFooter4 = document.querySelector("#textFooter4")
    const footerMain = document.querySelector(".footerMain")
    footerMain.classList.add("hideHelp")
    clearButton.classList.add("hideHelp")
    function nameValidator(userName) {
        const regex = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/
        if (userName.trim() === "") {
            alert("Cannot send an empty Username")
            return false
        }
        const regexTest = regex.test(userName)
        if (!regexTest) {
            alert("Invalid Username!")
        }
        return regexTest
    }
    async function fetchingData(userName) {
        const link = `https://leetcode-stats-api.herokuapp.com/${userName}`
        try {
            searchButton.innerText = "Searching"
            searchButton.disabled = true
            const response = await fetch(link)
            if (!response.ok) {
                throw new Error("Unable to fetch the user details")
            }
            const data = await response.json()

            if (data["status"] === "success") {

                const totalEasy = data["totalEasy"]
                const totalHard = data["totalHard"]
                const totalMedium = data["totalMedium"]
                const easySolved = data["easySolved"]
                const hardSolved = data["hardSolved"]
                const mediumSolved = data["mediumSolved"]
                const acceptanceRate = data["acceptanceRate"]
                const reputation = data["reputation"]
                const ranking = data["ranking"]
                const contributionPoints = data["contributionPoints"]
                const progressEasy = (easySolved / totalEasy) * 100
                const progressMedium = (mediumSolved / totalMedium) * 100
                const progressHard = (hardSolved / totalHard) * 100
                const dataChange = {
                    "progressEasy": progressEasy,
                    "progressMedium": progressMedium,
                    "progressHard": progressHard,
                    "easySolved": easySolved,
                    "hardSolved": hardSolved,
                    "mediumSolved": mediumSolved,
                    "totalEasy": totalEasy,
                    "totalHard": totalHard,
                    "totalMedium": totalMedium,
                    "acceptanceRate": acceptanceRate,
                    "contributionPoints": contributionPoints,
                    "reputation": reputation,
                    "ranking": ranking,
                }
                changingData(dataChange)
            }
            else {
                alert("No data found for this username")
            }
        }
        catch (err) {
            console.log(err)
        }
        finally {
            searchButton.innerText = "Search"
            searchButton.disabled = false
        }
    }
    function changingData(dataChange) {

        footerMain.classList.remove("hideHelp")
        clearButton.classList.remove("hideHelp")
        easyText.innerHTML = `<span style="color: white;" >${dataChange["easySolved"]}/${dataChange["totalEasy"]}<br>Easy</span>`
        mediumText.innerHTML = `<span style="color: white;" >${dataChange["mediumSolved"]}/${dataChange["totalMedium"]}<br>Medium</span>`
        hardText.innerHTML = `<span style="color: white;" >${dataChange["hardSolved"]}/${dataChange["totalHard"]}<br>Hard</span>`
        textFooter1.innerHTML = `<p style="color: white;" >Acceptance Rate: ${dataChange["acceptanceRate"]}</p>`
        textFooter2.innerHTML = `<p style="color: white;" >Contribution Points: ${dataChange["contributionPoints"]}</p>`
        textFooter3.innerHTML = `<p style="color: white;" >Ranking: ${dataChange["ranking"]}</p>`
        textFooter4.innerHTML = `<p style="color: white;" >Reputation: ${dataChange["reputation"]}</p>`
        easyCircle.style.background = `conic-gradient(#299f5d ${dataChange["progressEasy"]}%,#283a2e 0%)`
        mediumCircle.style.background = `conic-gradient(#299f5d ${dataChange["progressMedium"]}%,#283a2e 0%)`
        hardCircle.style.background = `conic-gradient(#299f5d ${dataChange["progressHard"]}%,#283a2e 0%)`

    }
    searchButton.addEventListener("click", function () {
        userName = inputUsername.value


        if (nameValidator(userName)) {
            fetchingData(userName)
        }
    })
    clearButton.addEventListener("click", function () {
        footerMain.classList.add("hideHelp")
        clearButton.classList.add("hideHelp")
        inputUsername.value = ""
        easyText.innerHTML = `<span style="color: white;" >Easy</span>`
        mediumText.innerHTML = `<span style="color: white;" >Medium</span>`
        hardText.innerHTML = `<span style="color: white;" >Hard</span>`
        easyCircle.style.background = `conic-gradient(#299f5d 0%,#283a2e 0%)`
        mediumCircle.style.background = `conic-gradient(#299f5d -0%,#283a2e 0%)`
        hardCircle.style.background = `conic-gradient(#299f5d 0%,#283a2e 0%)`
    })
})

