<script>
    import { onMount } from "svelte";

    /**
   * @type {any[]}
   */
    let scoutingData = [];

    onMount(async () => {
        fetch("/api/getScoutingData").then((res) => {
            res.json().then((data) => {
                scoutingData = data.values;
            });
        });
    });
</script>

<!-- indexes: Date	scouter	matchNum	team	alliance	matchType	startPos	autoAttemptedPieces	autoMobility	autoChargePosition	autoScoringGrid	teleopSmartPlacement	teleopDefended	floorPickup	substationUse	teleopScoringGrid	endgameChargePosition	endgameAllianceDocked	engameAllianceLinksScore	miscDriverSkill	miscDefenceRating	miscSpeed	miscImmobilized	miscTippy	miscDroppedCones	miscGoodPartners	comments	robotRating	appRating -->
<div class="container-fluid">
    {#each scoutingData as data}
        <div class="grid">
            <div>{data[1] || ""}</div>
            <div>{data[2] || ""}</div>
            <div>{data[3] || ""}</div>
            <div>{data[4] || ""}</div>
            <div>{data[26] || ""}</div>
            <div>{data[27] || ""}</div>
            <div>{data[28] || ""}</div>
        </div>
    {/each}
</div>