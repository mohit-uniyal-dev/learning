export const dsaTwoPointerCourse = {
  id: "dsa-two-pointer",
  title: "DSA Visual Template: Two-Pointer Pattern",
  supportsModes: false,
  steps: [
    {
      id: "tp-intuition",
      kicker: "Step 1 · Core Intuition",
      title: "Why Two Pointers Beat Nested Loops",
      lead: "Given a sorted array, finding two numbers that sum to a target takes O(n²) with nested loops—but only O(n) when two pointers move inward from both ends.",
      widget: "dsa-two-pointer",
      takeaway: "<strong>Key Insight:</strong> Because the array is sorted, moving the Left pointer right increases the sum, and moving the Right pointer left decreases it."
    },
    {
      id: "tp-invariant",
      kicker: "Step 2 · Loop Invariant",
      title: "When to Move Left vs. Right",
      lead: "At every step, compare <code>arr[L] + arr[R]</code> against <code>target</code>. You eliminate an entire row or column of pairs in a single comparison.",
      widget: "dsa-two-pointer",
      takeaway: "<strong>Key Insight:</strong> If <code>sum &lt; target</code>, increment <code>L</code>. If <code>sum &gt; target</code>, decrement <code>R</code>. Stop when <code>sum === target</code> or <code>L &gt;= R</code>."
    },
    {
      id: "tp-check",
      kicker: "Step 3 · Quick Check",
      title: "Verify Time & Space Complexity",
      lead: "Test your grasp of the two-pointer trade-off before applying it to similar sorted-array or palindrome problems.",
      widget: "dsa-quiz",
      takeaway: "<strong>Template Ready:</strong> Add new DSA or system-design topics by adding a module in <code>site/js/courses/</code> and registering it in <code>site/js/app.js</code>."
    }
  ]
};
