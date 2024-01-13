<template>
    <main>
        <div id="main-container">
            <div id="score-container">
                <div>
                    <h2>Player 1: {{ p1Score }}</h2>
                </div>
                <div>
                    <h2>CPU: {{ p2Score }}</h2>
                </div>
            </div>

            <div id="top-trumps-container">
                <div id="p1-current" class="player-card">
                    <h2 class="player-header">Players Card</h2>
                    {{ p1Current[0]?.firstName }}
                    {{ p1Current[0]?.lastName }}
                    {{ p1Current[0]?.position }}
                    {{ p1Current[0]?.power }}
                    {{ p1Current[0]?.cost }}
                    <img :src="p1Current[0]?.imageLink" class="player-image" />
                </div>

                <div id="p2-current" class="player-card">
                    <h2 class="player-header">CPU Card</h2>
                    {{ p1Current[0]?.firstName }}
                    {{ p1Current[0]?.lastName }}
                    {{ p1Current[0]?.position }}
                    {{ p1Current[0]?.power }}
                    {{ p1Current[0]?.cost }}
                    <img :src="p1Current[0]?.imageLink" class="player-image" />
                </div>
            </div>

            <div id="button-container">
                <div>
                    <button id="reset-btn">Play Again?</button>
                </div>

                <div id="stat-btns">
                    <button v-for="stat in statButtons" :key="stat" id:="`btn-${stat}`" @click="compareStat(stat)">
                        {{ capitalFirst(stat) }}
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: "Arena",
    data() {
        return {
            cards: [],
            p1Cards: [],
            p2Cards: [],
            p1Current: [],
            p2Current: [],
            p1Score: 0,
            p2Score: 0,
            outcome: "",
            msgDisplay: "",
            isP1Win: false,
            isP2Win: false,
            statButtons: [
                "pace",
                "shooting",
                "passing",
                "dribbling",
                "defending",
                "physical",
            ]
        }
    },
    async created() {
        this.cards = await this.getPlayers();
        this.shuffle(this.cards);
        this.playGame();
    },
    mounted() {
    },
    methods: {
        getPlayers: async function () {
            const query = `
            { 
                playerTypeCollection {
                items {
                    firstName
                    lastName
                    position
                    power
                    cost
                    imageLink
                }
                }             
            }`;

            const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}/`;
            const fetchOptions = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            };

            try {
                const response = await fetch(fetchUrl, fetchOptions);
                const data = await response.json();

                if (data.errors) {
                    // Handle errors here if needed
                    console.error("Contentful GraphQL API Error:", data.errors);
                    return [];
                }
                return data.data.playerTypeCollection.items;
            } catch (error) {
                console.error("Error fetching data from Contentful:", error);
                throw new Error('Cannot retrieve Contentful Data: ', error);
            }
        },
        shuffle(cards) {
            const deckLength = cards.length;
            let p1CardCount = 0;
            let p2CardCount = 0;

            for (let i = deckLength; i > 0; i--) {
                let cardIdx = Math.floor(Math.random() * i);
                if (cards.length === 0) break;
                let randomiseCard = cards.splice(cardIdx, 1);

                if (p1CardCount > p2CardCount) {
                    this.p2Cards.push(randomiseCard[0]);
                    p2CardCount += 1;
                } else if (p1CardCount === p2CardCount) {
                    this.p1Cards.push(randomiseCard[0]);
                    p1CardCount += 1;
                }
            }
        },
        capitalFirst(string) {
            let result = string.charAt(0).toUpperCase() + string.slice(1);
            return result;
        },

        // Totalling total score after each "round" in the game
        processRoundOutcome(outcome) {
            if (this.isP1Win) {
                this.p1Score += 1;

                this.p1Cards.push(this.p2Current.splice(0, 1)[0]);
                this.p1Cards.push(this.p1Current.splice(0, 1)[0]);
            } else if (this.isP2Win) {
                this.p2Score += 1;

                this.p2Cards.push(this.p1Current.splice(0, 1)[0]);
                this.p2Cards.push(this.p2Current.splice(0, 1)[0]);
            } else {
                this.p1Cards.push(this.p1Current.splice(0, 1)[0]);
                this.p2Cards.push(this.p2Current.splice(0, 1)[0]);
            }

            if (this.isP1Win || this.isP2Win) {
                this.msgDisplay = winnerMessage;
            } else {
                this.msgDisplay = tieMessage;
            }

            setTimeout(() => {
                msgDisplay = "";
            }, 2000);
            playGame();
        },

        playGame() {
            // If each player has less than 20 cards in their deck
            if (this.p1Cards.length < 10 && this.p2Cards.length < 10) {
                this.currentCard();
                return;
            }

            const isP1Win = this.p1Cards.length === 10;
            const isP2Win = this.p2Cards.length === 10;
            const winnerText = isP1Win ? "one" : "two";
            const winnerMessage = `Player ${winnerText} wins the game`;

            if (isP1Win || isP2Win) {
                this.msgDisplay = winnerMessage;
            }
        },
        currentCard() {
            // Select a random card from each player's deck
            const p1 = Math.floor(Math.random() * this.p1Cards.length);
            const p2 = Math.floor(Math.random() * this.p2Cards.length);

            // Update data properties using this
            this.p1Current = [this.p1Cards.splice(p1, 1).shift()];
            this.p2Current = [this.p2Cards.splice(p2, 1).shift()];

            console.log(this.p1Current)
            console.log(this.p2Current)
        },

        compareStat(stat) {
            const p1Stat = this.p1Current[0][stat];
            const p2Stat = this.p2Current[0][stat];

            if (p1Stat > p2Stat) {
                processRoundOutcome("p1-win");
            } else if (p2Stat > p1Stat) {
                processRoundOutcome("p2-win");
            } else {
                processRoundOutcome("draw");
            }
        }
    }
}
</script>
